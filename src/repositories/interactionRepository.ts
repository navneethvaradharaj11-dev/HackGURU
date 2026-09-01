import { AdapterFactory } from '../adapters/adapterFactory';
import { IDatabaseAdapter } from '../adapters/databaseAdapter.interface';
import { ActionType } from '@prisma/client';

export class InteractionRepository {
  private get adapter(): IDatabaseAdapter {
    return AdapterFactory.getAdapter();
  }

  public async logInteraction(data: {
    studentId: string;
    eventId: string;
    action: ActionType;
    metadata?: any;
  }): Promise<any> {
    return this.adapter.logInteraction(data);
  }

  public async getStudentInteractions(studentId: string): Promise<any[]> {
    return this.adapter.getStudentInteractions(studentId);
  }
}
