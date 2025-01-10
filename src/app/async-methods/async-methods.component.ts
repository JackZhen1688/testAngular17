import { Component } from '@angular/core';

@Component({
  selector: 'app-async-methods',
  standalone: true,
  imports: [],
  templateUrl: './async-methods.component.html',
  styleUrl: './async-methods.component.css'
})
export class AsyncMethodsComponent {

  //async onSubmit()
  //  const savedData = await this.saveWorkPlanSharedPorts(this.workPlan.id, this.workPlan)

  //async saveWorkPlanSharedPorts(workPlanId, workPlan):Promise<WorkPlan>
  //  const savedData: any = await this.workPlanService.createWorkPlanSharedPorts(workPlanId, workPlan).toPromise();
  //  return savedData;
  
}
