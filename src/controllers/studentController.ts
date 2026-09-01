import { Request, Response, NextFunction } from 'express';
import { StudentService } from '../services/studentService';
import { ResponseUtil } from '../utils/apiResponse';

export class StudentController {
  private studentService: StudentService;

  constructor() {
    this.studentService = new StudentService();
  }

  public getMe = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
      const profile = await this.studentService.getProfileByUserId(userId);
      return ResponseUtil.success(res, profile, 'Student profile fetched successfully');
    } catch (err: any) {
      return ResponseUtil.error(res, err.message, 404);
    }
  };

  public updateMe = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const studentId = (req as any).user.studentId;
      const updated = await this.studentService.updateProfile(studentId, req.body);
      return ResponseUtil.success(res, updated, 'Student profile updated successfully');
    } catch (err: any) {
      return ResponseUtil.error(res, err.message, 400);
    }
  };

  public getInterests = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const interests = await this.studentService.getAllInterests();
      return ResponseUtil.success(res, interests, 'All interests fetched');
    } catch (err: any) {
      return ResponseUtil.error(res, err.message, 500);
    }
  };

  public getMyInterests = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
      const profile = await this.studentService.getProfileByUserId(userId);
      return ResponseUtil.success(res, profile.interests, 'Student interests fetched');
    } catch (err: any) {
      return ResponseUtil.error(res, err.message, 404);
    }
  };

  public updateMyInterests = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const studentId = (req as any).user.studentId;
      const { interestIds } = req.body;
      await this.studentService.updateInterests(studentId, interestIds || []);
      const profile = await this.studentService.getProfileByUserId((req as any).user.userId);
      return ResponseUtil.success(res, profile.interests, 'Student interests updated');
    } catch (err: any) {
      return ResponseUtil.error(res, err.message, 400);
    }
  };

  public getMySkills = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const userId = (req as any).user.userId;
      const profile = await this.studentService.getProfileByUserId(userId);
      return ResponseUtil.success(res, profile.skills, 'Student skills fetched');
    } catch (err: any) {
      return ResponseUtil.error(res, err.message, 404);
    }
  };
}
