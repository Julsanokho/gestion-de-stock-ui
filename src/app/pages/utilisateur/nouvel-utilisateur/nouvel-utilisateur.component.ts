import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilisateursService} from '../../../../gs-api/src/services/utilisateurs.service';
import {CltfrsService} from '../../../services/cltfrs/cltfrs.service';
import {PhotosService} from '../../../../gs-api/src/services/photos.service';
import SavePhotoParams = PhotosService.SavePhotoParams;
import {AdresseDto} from '../../../../gs-api/src/models/adresse-dto';
import {UtilisateurDto} from '../../../../gs-api/src/models/utilisateur-dto';
import {ClientDto} from '../../../../gs-api/src/models/client-dto';

@Component({
  selector: 'app-nouvel-utilisateur',
  templateUrl: './nouvel-utilisateur.component.html',
  styleUrls: ['./nouvel-utilisateur.component.scss']
})
export class NouvelUtilisateurComponent implements OnInit {

  origin = '';
  utilisateurDto: any = {};
  adresseDto: AdresseDto = {};
  errorMsg: Array<string> = [];
  file: File | null = null;
  imgUrl: string | ArrayBuffer = 'assets/product.png';

  constructor(
    private router: Router,
    private utilisateursService: UtilisateursService,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotosService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.origin = 'utilisateurs';
    });
    this.findObject();
  }

  cancel(): void {
    this.router.navigate(['utilisateurs']);
  }

  findObject(): void {
    const idUtilisateur = this.activatedRoute.snapshot.params.id;
    if (idUtilisateur) {
      this.utilisateursService.findById(idUtilisateur)
        .subscribe(utilisateur => {
          this.utilisateurDto = utilisateur;
          this.adresseDto = this.utilisateurDto.adresse;
        });
    }
  }

  enregistrerUtilisateur(): void {
    this.utilisateursService.save(this.mapToUtilisateur())
      .subscribe(utilisateur => {
        this.savePhoto(utilisateur.id, utilisateur.nom);
      }, error => {
        this.errorMsg = error.error.errors;
      });
  }

  mapToUtilisateur(): UtilisateurDto {
    const utilisateurDto: UtilisateurDto = this.utilisateurDto;
    utilisateurDto.adresse = this.adresseDto;
    return utilisateurDto;
  }

  onFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
      if (this.file) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(this.file);
        fileReader.onload = (event) => {
          if (fileReader.result) {
            this.imgUrl = fileReader.result;
          }
        };
      }
    }
  }

  savePhoto(idUtilisateur?: number, titre?: string): void {
    if (idUtilisateur && titre && this.file) {
      const params: SavePhotoParams = {
        id: idUtilisateur,
        file: this.file,
        title: titre,
        context: 'utilisateurs'
      };
      this.photoService.savePhoto(params)
        .subscribe(res => {
          this.router.navigate(['utilisateurs']);
        });
    } else {
      this.router.navigate(['utilisateurs']);
    }
  }
}
