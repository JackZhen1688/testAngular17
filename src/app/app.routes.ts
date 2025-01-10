import { Routes } from '@angular/router';
import { TestComponent } from './test/test.component';
import { FormFieldsComponent } from './form-fields/form-fields.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { MatTablesComponent } from './mat-tables/mat-tables.component';
import { MatPanelsComponent } from './mat-panels/mat-panels.component';
import { AsyncMethodsComponent } from './async-methods/async-methods.component';
import { ParentComponent } from './parent-children/parent/parent.component';
import { NestedFormarrayComponent } from './nested-formarray/nested-formarray.component';
import { CaseMilestoneComponent } from './nested-formarray/case-milestone/case-milestone.component';
import { InheritClassComponent } from './inherit-class/inherit-class.component';

export const routes: Routes = [
    { path: '', component: TestComponent},
    { path: 'test/:id', component: TestComponent},
    { path: 'formFields', component: FormFieldsComponent},
    { path: 'reactiveForm', component: ReactiveFormComponent},
    { path: 'matTables', component: MatTablesComponent},
    { path: 'matPanels', component: MatPanelsComponent},
    { path: 'asyncMethod', component: AsyncMethodsComponent},
    { path: 'parentChild', component: ParentComponent},
    { path: 'nestedFormarray', component: NestedFormarrayComponent},
    { path: 'caseMilestone', component: CaseMilestoneComponent},
    { path: 'inheritClass', component: InheritClassComponent},
];
