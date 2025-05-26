import { api, handleApiError } from './api';
import { User, UserCredentials, UserRegistration, UserProfile } from '../models/User';

export const userService = {
  // Authentification
  login: async (credentials: UserCredentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Inscription
  register: async (userData: UserRegistration) => {
    try {
      const response = await api.post('/auth/register', userData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('token');
  },

  // Récupérer le profil utilisateur
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Mettre à jour le profil
  updateProfile: async (profile: UserProfile) => {
    try {
      const response = await api.put('/users/profile', profile);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Changer le mot de passe
  changePassword: async (oldPassword: string, newPassword: string) => {
    try {
      await api.put('/users/password', { oldPassword, newPassword });
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Récupérer les préférences utilisateur
  getPreferences: async () => {
    try {
      const response = await api.get('/users/preferences');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Mettre à jour les préférences
  updatePreferences: async (preferences: User['preferences']) => {
    try {
      const response = await api.put('/users/preferences', preferences);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}; 