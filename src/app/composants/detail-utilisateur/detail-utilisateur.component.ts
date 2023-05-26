import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UtilisateursService} from '../../../gs-api/src/services/utilisateurs.service';
import {UtilisateurDto} from '../../../gs-api/src/models/utilisateur-dto';

@Component({
  selector: 'app-detail-utilisateur',
  templateUrl: './detail-utilisateur.component.html',
  styleUrls: ['./detail-utilisateur.component.scss']
})
export class DetailUtilisateurComponent implements OnInit {

  @Input()
  utilisateurDto: UtilisateurDto = {};
  @Output()
  suppressionResult = new EventEmitter();

  constructor(
    private router: Router,
    private utilisateursService: UtilisateursService
  ) { }

  ngOnInit(): void {
  }

  modifierUtilisateur(): void {
      this.router.navigate(['nouvelutilisateur', this.utilisateurDto.id]);
  }

  confirmerEtSupprimerUtilisateur(): void {
    if (this.utilisateurDto.id) {
      this.utilisateursService.delete(this.utilisateurDto.id)
        .subscribe(res => {
          this.suppressionResult.emit('success');
        }, error => {
          this.suppressionResult.emit(error.error.error);
        });
    }
  }
}
