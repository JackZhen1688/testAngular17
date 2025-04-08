import { Component } from '@angular/core';

@Component({
  selector: 'app-async-methods',
  standalone: true,
  imports: [],
  templateUrl: './async-methods.component.html',
  styleUrl: './async-methods.component.css'
})
export class AsyncMethodsComponent {

  //1. async onSubmit()
  //   const savedData = await this.saveWorkPlanSharedPorts(this.workPlan.id, this.workPlan)
  //   if (savedData)
  //       this.dialogRef.close(this.selectedAttributes)

  //2. async saveWorkPlanSharedPorts(workPlanId, workPlan):Promise<WorkPlan>
  //   const savedData: any = await this.workPlanService.createWorkPlanSharedPorts(workPlanId, workPlan).toPromise();
  //   return savedData;
  
  //3. Service fetch data using async/await
  //   async createWorkPlanSharedPorts(workPlanId, workPlan): Promise<any[]> {
  //   const response = await this.http.post<any[]>(this.apiUrl, workPlan).toPromise();

  //=====
  //async saveWorkUnit(workUnit): Promise<WorkUnitData> {
  //  const savedData = await this.workUnitService.updateWorkUnit(workUnit).toPromise();
  //  return new WorkUnitData(savedData);
  //}
}
