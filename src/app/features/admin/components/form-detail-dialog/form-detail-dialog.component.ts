import {Component, Inject} from '@angular/core';
import {Form} from '../../../../core/models/admin.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-form-detail-dialog',
  standalone: false,

  templateUrl: './form-detail-dialog.component.html',
  styleUrl: './form-detail-dialog.component.css'
})
export class FormDetailDialogComponent {
  editedForm: Partial<Form>;

  constructor(
    public dialogRef: MatDialogRef<FormDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      form: Form;
      mode: 'view' | 'edit';
    }
  ) {
    this.editedForm = {
      additionalInfo: data.form.additionalInfo
    };
  }

  save() {
    this.dialogRef.close(this.editedForm);
  }
}
