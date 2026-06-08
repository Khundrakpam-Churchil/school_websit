import { z } from 'zod';

// Student validation schemas
export const createStudentSchema = z.object({
  reg_no: z.string()
    .length(10, 'Registration number must be exactly 10 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Registration number must be alphanumeric'),
  student_name: z.string().trim()
    .min(3, 'Student name must be at least 3 characters')
    .max(100, 'Student name cannot exceed 100 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
  class_name: z.string().trim()
    .min(1, 'Class name is required'),
  roll_number: z.string().trim()
    .min(1, 'Roll number is required'),
  photo_url: z.string().url('Photo URL must be a valid URL').nullable().optional().or(z.literal('')),
  email: z.string().email('Email must be valid').nullable().optional().or(z.literal('')),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone number must be 10 digits').nullable().optional().or(z.literal('')),
  date_of_birth: z.string().nullable().optional().or(z.literal('')),
  parent_name: z.string().trim().nullable().optional().or(z.literal('')),
  parent_phone: z.string().regex(/^[0-9]{10}$/, 'Parent phone number must be 10 digits').nullable().optional().or(z.literal('')),
});

export const updateStudentSchema = z.object({
  student_name: z.string().trim().min(3).max(100),
  class_name: z.string().trim().min(1),
  roll_number: z.string().trim().min(1),
  photo_url: z.string().url().nullable().or(z.literal('')),
  email: z.string().email().nullable().or(z.literal('')),
  phone: z.string().regex(/^[0-9]{10}$/).nullable().or(z.literal('')),
  date_of_birth: z.string().nullable().or(z.literal('')),
  parent_name: z.string().trim().nullable().or(z.literal('')),
  parent_phone: z.string().regex(/^[0-9]{10}$/).nullable().or(z.literal('')),
}).partial();

// Admin validation schema
export const adminLoginSchema = z.object({
  username: z.string()
    .regex(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric')
    .min(3, 'Username must be at least 3 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
});

// Student login schema
export const studentLoginSchema = z.object({
  registrationNumber: z.string()
    .length(10, 'Registration number must be exactly 10 characters')
    .regex(/^[a-zA-Z0-9]+$/, 'Registration number must be alphanumeric'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters'),
});

// Notice validation schema
export const createNoticeSchema = z.object({
  title: z.string().trim()
    .min(5, 'Notice title must be at least 5 characters')
    .max(255, 'Notice title cannot exceed 255 characters'),
  content: z.string().trim()
    .min(10, 'Notice content must be at least 10 characters')
    .max(5000, 'Notice content cannot exceed 5000 characters'),
});

// Gallery validation schema
export const createGallerySchema = z.object({
  category: z.string().trim().min(1, 'Gallery category is required'),
  image_url: z.string().url('Image URL must be a valid URL'),
  caption: z.string().trim()
    .min(1, 'Image caption is required')
    .max(255, 'Caption cannot exceed 255 characters'),
});

// Fee update schema
export const updateFeeSchema = z.object({
  fee_status: z.enum(['Pending', 'Paid', 'Partial'], {
    errorMap: () => ({ message: 'Fee status must be one of: Pending, Paid, Partial' }),
  }),
});
