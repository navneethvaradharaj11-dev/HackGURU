import { AdapterFactory } from '../adapters/adapterFactory';
import { IDatabaseAdapter } from '../adapters/databaseAdapter.interface';

export class EventRepository {
  private get adapter(): IDatabaseAdapter {
    return AdapterFactory.getAdapter();
  }

  public async findAll(params?: {
    category?: string;
    location?: string;
    search?: string;
    limit?: number;
    skip?: number;
  }): Promise<any[]> {
    return this.adapter.findAllEvents(params);
  }

  public async findById(id: string): Promise<any | null> {
    return this.adapter.findEventById(id);
  }

  public async createEvent(data: any): Promise<any> {
    return this.adapter.createEvent(data);
  }

  public async upsertIntelligence(
    eventId: string,
    data: any
  ): Promise<any> {
    return this.adapter.upsertEventIntelligence(eventId, data);
  }

  public async getCandidateEventsForStudent(limit: number = 500): Promise<any[]> {
    return this.adapter.getCandidateEventsForStudent(limit);
  }
}
