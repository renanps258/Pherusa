import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { createTable, searchByCodigo } from './BD';

export default function App() {
  const [codigo, setCodigo] = useState('');
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    
    createTable();
  }, []);

  const buscarDados = () => {
    searchByCodigo(codigo, (data) => {
      if (data) {
        setResultado(data);
      } else {
        setResultado(null); 
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pesquisar Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o código"
        value={codigo}
        onChangeText={setCodigo}
      />
      <Button title="Buscar" onPress={buscarDados} />

      {resultado ? (
        <View style={styles.result}>
          <Text style={styles.label}>Descrição: {resultado.descricao}</Text>
          <Text style={styles.label}>Localização: {resultado.localizacao}</Text>
        </View>
      ) : (
        <Text style={styles.notFound}>Não encontrado</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#000080',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  result: {
    marginTop: 20,
  },
  label: {
    fontSize: 18,
  },
  notFound: {
    marginTop: 20,
    color: 'red',
    fontSize: 16,
  },
});
