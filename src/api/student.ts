// libs
import axios from 'axios'

// variables
import { config } from '@/config/variables'

// interfaces
import type { QueryId, QueryParams } from '@/interfaces/common/Response'
import type { Student, StudentDataResponse } from '@/interfaces/api/Student'

export const getStudents = async ({ page = 1, limit = 10, revalidate = true }: QueryParams): Promise<StudentDataResponse> => {
  const response = await axios.get<StudentDataResponse>(`${config.apiUrl}/users?page=${page}&limit=${limit}&revalidate=${String(revalidate)}`)
  return response.data
}

export const getStudentId = async ({ id }: QueryId): Promise<Student> => {
  const response = await axios.get<Student>(`${config.apiUrl}/users/${id}`)
  return response.data
}

export const postStudent = async (student: Student): Promise<Student> => {
  const response = await axios.post(`${config.apiUrl}/users`, student)
  return response.data
}

export const updateStudent = async (student: Student): Promise<Student> => {
  const userId = student.id ?? ''
  delete student.id
  const response = await axios.put(`${config.apiUrl}/users/${userId}`, student)
  return response.data
}

export const deleteStudent = async (student: Student): Promise<Student> => {
  const userId = student.id ?? ''
  const response = await axios.delete(`${config.apiUrl}/users/${userId}`)
  return response.data
}
