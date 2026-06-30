import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { Alert } from 'react-native';
import { FeedPost } from '../components/PlantCard';
import { getFeedPlants, insertPlant } from '../services/plantService';

type PlantContextValue = {
  posts: FeedPost[];
  addPost: (post: FeedPost) => Promise<void>;
};

const PlantContext = createContext<PlantContextValue | undefined>(undefined);

export function PlantProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<FeedPost[]>([]);

  // Ao abrir o app, carrega o que já está gravado no banco.
  useEffect(() => {
    getFeedPlants()
      .then(setPosts)
      .catch((error) => console.log('Erro ao carregar plantas:', error));
  }, []);

  async function addPost(post: FeedPost) {
    // mostra na hora (otimista) e grava no banco em seguida
    setPosts((current) => [post, ...current]);

    try {
      const { id, imageUri } = await insertPlant(post);
      // sincroniza o id local com o id real gerado pelo banco e troca a uri
      // temporária pela permanente (a foto agora vive na pasta do app)
      setPosts((current) =>
        current.map((item) =>
          item.id === post.id ? { ...item, id: String(id), imageUri } : item
        )
      );
    } catch (error) {
      console.log('Erro ao salvar planta:', error);
      // a gravação falhou: desfaz o post otimista para o feed não mostrar
      // algo que não foi salvo de verdade (sumiria ao reabrir o app)
      setPosts((current) => current.filter((item) => item.id !== post.id));
      Alert.alert(
        'Não foi possível salvar',
        // mostra o erro real do SQLite para facilitar o diagnóstico
        String(error instanceof Error ? error.message : error)
      );
    }
  }

  return (
    <PlantContext.Provider value={{ posts, addPost }}>
      {children}
    </PlantContext.Provider>
  );
}

export function usePlants() {
  const context = useContext(PlantContext);

  if (!context) {
    throw new Error('usePlants deve ser usado dentro de um PlantProvider');
  }

  return context;
}
