import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/calcular', (req, res) => {
  const { alunos } = req.body;
  if (!alunos || alunos.length === 0) {
    return res.status(400).json({ erro: 'Nenhum aluno foi enviado para cálculo.' });
  }

  const alunosProcessados = alunos.map(aluno => {
    const notas = [
      Number(aluno.nota1),
      Number(aluno.nota2),
      Number(aluno.nota3),
      Number(aluno.nota4),
      Number(aluno.nota5)
    ];
    
    const somaNotas = notas.reduce((acumulador, nota) => acumulador + nota, 0);
    const media = somaNotas / 5;
    
    return {
      nome: aluno.nome,
      notas: notas,
      media: media,
      frequencia: Number(aluno.frequencia)
    };
  });

  const totalAlunos = alunosProcessados.length;
  const mediasDisciplinas = [];
  for (let i = 0; i < 5; i++) {
    const somaDisciplina = alunosProcessados.reduce((acumulador, aluno) => acumulador + aluno.notas[i], 0);
    mediasDisciplinas.push(somaDisciplina / totalAlunos);
  }

  const somaMediasGerais = alunosProcessados.reduce((acumulador, aluno) => acumulador + aluno.media, 0);
  const mediaGeralTurma = somaMediasGerais / totalAlunos;

  const alunosAcimaMedia = alunosProcessados
    .filter(aluno => aluno.media > mediaGeralTurma)
    .map(aluno => aluno.nome); 

  const alunosBaixaFrequencia = alunosProcessados
    .filter(aluno => aluno.frequencia < 75)
    .map(aluno => aluno.nome);

  res.json({
    resultadoAlunos: alunosProcessados.map(a => `${a.nome} ${a.media} ${a.frequencia}%`),
    resultadoDisciplinas: mediasDisciplinas.join(' '),
    resultadoAcimaMedia: alunosAcimaMedia.length > 0 ? alunosAcimaMedia : [''], 
    resultadoBaixaFrequencia: alunosBaixaFrequencia.length > 0 ? alunosBaixaFrequencia : ['']
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor do Professor Carlos rodando na porta ${PORT}!`);
});