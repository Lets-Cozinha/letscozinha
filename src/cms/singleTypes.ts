import {
  type CMSRecipesResponse,
  RECIPES_POPULATE,
  mapRecipe,
} from './recipes';
import { CMS_TOKEN, CMS_URL } from './config';
import { cache } from 'react';
import { mapCMSData } from './mapCMSData';
import qs from 'qs';
import type { CMSImage, CMSSingleDataResponse } from './types';

type LetsCozinhaCMSResponse = CMSSingleDataResponse<{
  titulo: string;
  descricao?: string;
  receitas_favoritas_titulo: string;
  receitas_favoritas: CMSRecipesResponse;
}>;

export const getLetsCozinha = cache(async () => {
  const query = qs.stringify({
    populate: {
      receitas_favoritas: {
        populate: RECIPES_POPULATE,
      },
    },
  });

  const response: LetsCozinhaCMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  const receitas_favoritas =
    response.data.attributes.receitas_favoritas.data.map(mapRecipe);

  const letsCozinha = {
    ...mapCMSData(response.data),
    receitas_favoritas,
  };

  return { letsCozinha };
});

type LetsCozinhaLetsCMSResponse = CMSSingleDataResponse<{
  nome: string;
  resumo: string;
  texto_completo: string;
  imagem: CMSImage;
}>;

export const getLetsCozinhaLets = cache(async () => {
  const query = qs.stringify({
    populate: ['imagem'],
  });

  const response: LetsCozinhaLetsCMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-lets?${query}`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  const letsCozinhaLets = {
    ...mapCMSData(response.data),
    imagem: mapCMSData(response.data.attributes.imagem.data),
  };

  return { letsCozinhaLets };
});

type LetsCozinhaPoliticasCMSResponse = CMSSingleDataResponse<{
  politica_de_privacidade: string;
  termos_de_uso: string;
}>;

export const getLetsCozinhaPoliticas = cache(async () => {
  const response: LetsCozinhaPoliticasCMSResponse = await fetch(
    `${CMS_URL}/api/lets-cozinha-politicas`,
    {
      headers: {
        Authorization: `Bearer ${CMS_TOKEN}`,
      },
    }
  ).then((res) => res.json());

  const letsCozinhaPoliticas = mapCMSData(response.data);

  return { letsCozinhaPoliticas };
});
