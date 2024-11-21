import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchUserPreferences, saveUserPreferences } from '../services/api';
import toast from 'react-hot-toast';

export const PREFERENCES_QUERY_KEY = ['preferences'];

export function usePreferences() {
  const queryClient = useQueryClient();
  const [localSelectedServices, setLocalSelectedServices] = useState(new Set());
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const { data: initialServices = [], isLoading, error } = useQuery({
    queryKey: PREFERENCES_QUERY_KEY,
    queryFn: fetchUserPreferences,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });

  // Update local state when initial data is loaded
  useEffect(() => {
    if (initialServices.length > 0) {
      setLocalSelectedServices(new Set(initialServices));
      setHasUnsavedChanges(false);
    }
  }, [initialServices]);

  const { mutate: savePreferences, isPending: isSaving } = useMutation({
    mutationFn: () => saveUserPreferences(Array.from(localSelectedServices)),
    onSuccess: () => {
      toast.success('Preferences saved successfully');
      setHasUnsavedChanges(false);
      queryClient.invalidateQueries({ queryKey: PREFERENCES_QUERY_KEY });
    },
    onError: (error) => {
      if (error instanceof Error && error.message !== 'Backend server is not running') {
        toast.error('Failed to save preferences');
      }
    },
  });

  const updateLocalServices = (services) => {
    setLocalSelectedServices(services);
    setHasUnsavedChanges(true);
  };

  const isOffline = error instanceof Error && error.message === 'Backend server is not running';

  return {
    selectedServices: localSelectedServices,
    isLoading,
    isSaving,
    isOffline,
    hasUnsavedChanges,
    savePreferences,
    updateLocalServices,
  };
}