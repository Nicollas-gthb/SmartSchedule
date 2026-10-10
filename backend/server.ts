import app from './src/app.ts';

const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
	console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
});