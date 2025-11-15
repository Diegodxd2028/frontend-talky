export interface ImageExplainResponse {
  texto_extraido: string;
  explicacion_clara: string;
  acciones_sugeridas: string[];
  nivel_urgencia: 'baja' | 'media' | 'alta';
}

import { API_BASE_URL } from './api.service';

export const imageService = {
  async traducirImagen(file: File, areaOficio: string = 'TI'): Promise<ImageExplainResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('area_oficio', areaOficio);

    const response = await fetch(`${API_BASE_URL}/api/v1/image/traducir`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}`);
    }

    return await response.json();
  },
};