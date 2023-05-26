import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateurDto} from '../../../../gs-api/src/models/utilisateur-dto';
import {UtilisateursService} from '../../../../gs-api/src/services/utilisateurs.service';

@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.scss']
})
export class PageUtilisateurComponent implements OnInit {
   listUtilisateur: Array<UtilisateurDto> = [];
  errorMsg = '';

  constructor(
    private router: Router,
    private utilisateursService: UtilisateursService
  ) { }

  ngOnInit(): void {
    this.findAllUtilisateurs();
  }

  findAllUtilisateurs(): void {
    this.utilisateursService.findAll()
      .subscribe(utilisateurs => {
        this.listUtilisateur = utilisateurs;
      });
  }

  nouvelUtilisateur(): void {
    this.router.navigate(['nouvelutilisateur']);
  }

  handleSuppression(event: any): void {
    if (event === 'success') {
      this.findAllUtilisateurs();
    } else {
      this.errorMsg = event;
    }
  }
}
