import { useState } from 'react';
const IconStudent = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const IconGrade = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconFreq = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconPlus = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>;
const IconCalc = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;

function App() {
  const [aluno, setAluno] = useState({
    nome: '', nota1: '', nota2: '', nota3: '', nota4: '', nota5: '', frequencia: ''
  });
  const [listaAlunos, setListaAlunos] = useState([]);
  const [resultados, setResultados] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  const isFormValido = aluno.nome !== '' && aluno.nota1 !== '' && aluno.nota2 !== '' && aluno.nota3 !== '' && aluno.nota4 !== '' && aluno.nota5 !== '' && aluno.frequencia !== '';

  const adicionarAluno = (e) => {
    e.preventDefault();
    setListaAlunos([...listaAlunos, aluno]);
    setAluno({ nome: '', nota1: '', nota2: '', nota3: '', nota4: '', nota5: '', frequencia: '' });
  };

  const calcularResultados = async () => {
    try {
      const resposta = await fetch('http://localhost:3000/calcular', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alunos: listaAlunos })
      });
      const dados = await resposta.json();
      setResultados(dados);
    } catch (erro) {
      console.error("Erro:", erro);
      alert("Erro ao calcular. Verifique se o servidor Back-end está rodando!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8 md:p-12 font-sans flex flex-col items-center">
      <header className="mb-12 text-center">
        <div className="inline-flex items-center gap-3 bg-gray-900 border border-gray-800 p-3 px-5 rounded-full shadow-inner mb-4">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-gray-400 text-xs font-mono uppercase tracking-widest">Portal Oficial de Gestão</span>
        </div>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-blue-200 mb-3 tracking-tighter">
          Gestor Professor Carlos
        </h1>
        <p className="text-gray-500 max-w-lg mx-auto text-sm">Controle centralizado de notas e frequências dos seus alunos de forma rápida e segura.</p>
      </header>

      <div className="bg-gray-900 bg-opacity-70 backdrop-blur-lg p-10 rounded-3xl shadow-[0_0_80px_-20px_rgba(59,130,246,0.3)] border border-gray-700/50 w-full max-w-4xl flex flex-col gap-10">
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-900 rounded-2xl text-blue-300"><IconStudent /></div>
            <h2 className="text-2xl font-bold tracking-tight">Cadastrar Novo Aluno</h2>
          </div>
          
          <form onSubmit={adicionarAluno} className="flex flex-col gap-6">
            <div className="relative">
              <label className="block text-xs font-mono uppercase text-gray-500 mb-1.5 ml-1">Nome Completo</label>
              <div className="absolute left-4 top-10 text-gray-500"><IconStudent /></div>
              <input type="text" name="nome" value={aluno.nome} onChange={handleChange} 
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl p-4 pl-12 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                placeholder="Ex: João da Silva" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] items-center gap-6">
              <div className="grid grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={`nota${num}`} className="relative">
                    <label className="block text-xs font-mono uppercase text-gray-500 mb-1.5 text-center">Nota {num}</label>
                    <input type="number" name={`nota${num}`} value={aluno[`nota${num}`]} onChange={handleChange} min="0" max="10"
                      className="w-full bg-gray-800/60 border border-gray-700 rounded-xl p-3 text-center font-bold text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="-" />
                  </div>
                ))}
              </div>
              <div className="text-center font-mono text-gray-700 font-bold text-3xl hidden md:block">|</div>
              <div className="relative">
                <label className="block text-xs font-mono uppercase text-gray-500 mb-1.5 ml-1">Frequência (%)</label>
                <div className="absolute left-4 top-10 text-gray-500"><IconFreq /></div>
                <input type="number" name="frequencia" value={aluno.frequencia} onChange={handleChange} min="0" max="100"
                  className="w-full bg-gray-800/60 border border-gray-700 rounded-xl p-4 pl-12 font-bold text-indigo-200 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  placeholder="-" />
              </div>
            </div>

            <button type="submit" disabled={!isFormValido}
              className={`flex items-center justify-center gap-3 p-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg ${
                isFormValido ? 'bg-blue-600 hover:bg-blue-500 text-white cursor-pointer' : 'bg-gray-800 text-gray-600 cursor-not-allowed shadow-none'
              }`}>
              <IconPlus /> Adicionar à Turma
            </button>
          </form>
        </section>

        <div className="border-t border-gray-800/60 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs text-gray-700 bg-gray-900 px-3 py-1 rounded-full uppercase tracking-widest border border-gray-800">Minha Turma</div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gray-800 border border-gray-700 rounded-2xl text-gray-400"><IconFreq /></div>
              <h3 className="text-xl font-semibold tracking-tight">Estudantes Cadastrados</h3>
            </div>
            <span className="font-mono bg-blue-950 text-blue-300 text-sm font-bold px-4 py-2 rounded-xl border border-blue-800">
              Total: {listaAlunos.length}
            </span>
          </div>

          <div className="space-y-3 max-h-56 overflow-y-auto pr-3 custom-scrollbar">
            {listaAlunos.length === 0 ? (
              <div className="text-center bg-gray-800/60 rounded-xl border border-gray-700 border-dashed py-10 px-6">
                <div className="text-gray-600 w-12 h-12 mx-auto mb-4"><IconStudent /></div>
                <p className="text-gray-500 italic text-sm">Nenhum aluno cadastrado. Use o formulário acima para começar!</p>
              </div>
            ) : (
              listaAlunos.map((a, index) => (
                <div key={index} className="bg-gray-800/60 p-4 rounded-xl flex justify-between items-center border border-gray-700/50 hover:bg-gray-800 transition-colors">
                  <div>
                    <span className="font-semibold text-white block">{a.nome}</span>
                    <span className="font-mono text-xs text-indigo-300 uppercase tracking-wide">Situação Atual: Registrado</span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-400 font-mono">
                    <span className="flex items-center gap-1.5"><IconGrade />[{a.nota1},{a.nota2},{a.nota3},{a.nota4},{a.nota5}]</span>
                    <span className="font-bold text-white flex items-center gap-1.5"><IconFreq />{a.frequencia}%</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {listaAlunos.length > 0 && (
            <button onClick={calcularResultados} 
              className="w-full mt-8 flex items-center justify-center gap-3 p-4 rounded-xl font-extrabold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer">
              <IconCalc /> Gerar Relatório Final e Calcular Médias
            </button>
          )}
        </section>
        {resultados && (
          <section className="border-t border-gray-800/60 pt-10">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-extrabold text-white tracking-tighter mb-2">Relatório de Desempenho</h3>
              <p className="text-gray-500 text-sm">Saída processada pelo servidor com base nos dados fornecidos.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-2 font-mono text-sm text-gray-300">
                <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">Alunos & Médias</h4>
                {resultados.resultadoAlunos.map((linha, i) => <p key={i} className="py-1 flex justify-between"><span>{linha.split(' ')[0]}</span> <span className="text-white font-bold">{linha.split(' ')[1]} / {linha.split(' ')[2]}</span></p>)}
              </div>
              
              <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 space-y-2 font-mono text-sm">
                <h4 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">Turma & Alertas</h4>
                <p className="py-1 flex justify-between border-b border-gray-800 pb-2 mb-3"><span>Médias por Disc.:</span> <span className="text-blue-400 font-bold">{resultados.resultadoDisciplinas}</span></p>
                
                {resultados.resultadoAcimaMedia.map((linha, i) => <p key={`acima-${i}`} className="py-1 flex justify-between text-emerald-400"><span>Média Acima da Turma:</span> <span className="font-bold">{linha}</span></p>)}
                
                {resultados.resultadoBaixaFrequencia.map((linha, i) => <p key={`baixa-${i}`} className="py-1 flex justify-between text-red-400"><span>Freq. Baixa (&lt;75%):</span> <span className="font-bold">{linha}</span></p>)}
              </div>
            </div>
          </section>
        )}
      </div>

      <footer className="mt-12 text-gray-700 text-xs font-mono">
        Desenvolvido para Teste Prático DTI Digital © 2026.
      </footer>
    </div>
  );
}

export default App;