import { AdapterFactory } from '../adapters/adapterFactory';
import { IDatabaseAdapter } from '../adapters/databaseAdapter.interface';

export class StudentRepository {
  private get adapter(): IDatabaseAdapter {
    return AdapterFactory.getAdapter();
  }

  public async findByUserId(userId: string): Promise<any | null> {
    return this.adapter.findStudentByUserId(userId);
  }

  public async findById(id: string): Promise<any | null> {
    return this.adapter.findStudentById(id);
  }

  public async createProfile(data: {
    userId: string;
    fullName: string;
    collegeName: string;
    branch: string;
    yearOfStudy: number;
    degree: string;
    location: string;
    careerGoal: string;
    bio?: string;
  }): Promise<any> {
    return this.adapter.createStudentProfile(data);
  }

  public async updateProfile(studentId: string, data: any): Promise<any> {
    return this.adapter.updateStudentProfile(studentId, data);
  }

  public async updateInterests(studentId: string, interestIds: string[]): Promise<void> {
    await this.adapter.updateStudentInterests(studentId, interestIds);
  }

  public async updateSkills(studentId: string, skills: { skillId: string; proficiencyLevel?: string }[]): Promise<void> {
    await this.adapter.updateStudentSkills(studentId, skills);
  }

  public async getAllInterests(): Promise<any[]> {
    return this.adapter.getAllInterests();
  }

  public async getAllSkills(): Promise<any[]> {
    return this.adapter.getAllSkills();
  }
}
