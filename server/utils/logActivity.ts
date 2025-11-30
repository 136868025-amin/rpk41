import { ActivityLog } from '~/server/models/activityLog.schema'

export const logActivity = async (
  action: 'create' | 'update' | 'delete' | 'login' | 'other',
  module: 'news' | 'gallery' | 'documents' | 'personnel' | 'calendar' | 'settings' | 'auth',
  description: string,
  user: string = 'Admin'
) => {
  try {
    await ActivityLog.create({
      action,
      module,
      description,
      user
    })
  } catch (e) {
    console.error('Failed to create activity log', e)
  }
}
