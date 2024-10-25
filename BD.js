import SQLite from 'react-native-sqlite-storage';


const db = SQLite.openDatabase(
  {
    name: 'test.db',
    location: 'default',
  },
  () => {
    console.log('Banco de dados aberto com sucesso');
  },
  error => {
    console.log('Erro ao abrir o banco de dados:', error);
  }
);


export const createTable = () => {
  db.transaction(tx => {
    
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS TB_BD (codigo INTEGER PRIMARY KEY, descricao TEXT, localizacao TEXT);',
      [],
      () => {
        console.log('Tabela criada com sucesso');
       
        insertData(); 
      },
      error => {
        console.log('Erro ao criar a tabela:', error);
      }
    );
  });
};


const insertData = () => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO TB_BD (codigo, descricao, localizacao) VALUES (?, ?, ?);',
      ['190434', 'CHUVEIRO LORENZETTI MAXI DUCHA', 'Prateleira 1 - Posição A-3'], //Inserindo dados para testar conforme aprovado
      () => {
        console.log('Dados inseridos com sucesso');
      },
      error => {
        console.log('Erro ao inserir dados:', error);
      }
    );

    tx.executeSql(
      'INSERT INTO TB_BD (codigo, descricao, localizacao) VALUES (?, ?, ?);',
      ['187116', 'CORREDICA TELESCOPICA ZINCADA 30 CM', 'Prateleira 9 - Posição A-4'], //Inserindo dados para testar conforme aprovado
      () => {
        console.log('Dados inseridos com sucesso');
      },
      error => {
        console.log('Erro ao inserir dados:', error);
      }
    );
  });
};


export const searchByCodigo = (codigo, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT descricao, localizacao FROM TB_BD WHERE codigo = ?;',
      [codigo],
      (tx, results) => {
        if (results.rows.length > 0) {
          const row = results.rows.item(0);
          callback(row);
        } else {
          callback(null); 
        }
      },
      error => {
        console.log('Erro ao buscar dados:', error);
      }
    );
  });
};
