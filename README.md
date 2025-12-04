# ProjetoTCC — App Mobile (React Native + Expo)

Aplicativo mobile desenvolvido em React Native com Expo para monitoramento de ansiedade e questionários (ex.: BAI).

Estrutura do projeto

Mobile App (este repositório) — React Native + Expo

Web App: https://github.com/BrunoAkT/ProjetoTCC.Web

Back-end API: https://github.com/BrunoAkT/ProjetoTCC.BackEnd

## Pré-requisitos
- Node.js 18+ e npm ou Yarn
- Expo (usando npx, não precisa instalar global)
- Android Studio (emulador) ou um dispositivo Android com Expo Go
- Backend da API rodando e acessível na mesma rede

⚠️ Observação importante sobre o local do projeto

Para evitar erros de build ou caminhos longos demais (comuns no Windows), recomenda-se que o projeto seja instalado em um diretório curto, como:

C:\ProjetoTCC\
D:\apps\ProjetoTCC\

Evite instalar em locais como Desktop, Documentos ou pastas com muitos níveis, pois isso pode gerar problemas com caminhos extensos durante instalações de dependências nativas.

## Configuração do projeto
1. Clone o repositório:
   - `git clone <URL_DO_REPO>`
   - `cd ProjetoTCC`

2. Instale as dependências:
   - `npm install` ou `yarn`

3. Configure a API (baseURL):
   - Abra `src/constants/api.js` e ajuste a `baseURL` para o endereço do seu backend (ex.: `http://SEU_IP:3000`).
   - Em Windows, para testar no emulador ou dispositivo, use o IP local da sua máquina (ex.: `http://192.168.0.10:3000`).

### Configuração da Chave de API (Google Gemini)

Para utilizar a funcionalidade de insights gerados por IA, você precisa configurar sua chave da API do Google Gemini.

1.  **Crie um arquivo `.env`** na raiz do projeto (`c:\Users\Bruno\Desktop\ProjetoTCC`).

2.  **Adicione sua chave** dentro do arquivo `.env`:
    ```
    GEMINI_API_KEY="SUA_CHAVE_AQUI"
    ```

3.  **Garanta a segurança:** Adicione a linha `.env` ao seu arquivo `.gitignore` para nunca enviar sua chave ao repositório.

4.  **Use no código:** O projeto já está configurado para ler esta variável. A chave é importada e utilizada no arquivo `src/screens/statistics/statistics.jsx` da seguinte forma:
    ```javascript
    import { GEMINI_API_KEY } from '@env';
    
    // ...
    const SUA_CHAVE_GEMINI = GEMINI_API_KEY;
    ```

O projeto usa `react-native-dotenv` para gerenciar as variáveis de ambiente. Se encontrar problemas, verifique se o plugin está listado em `babel.config.js`.

## Executando em desenvolvimento
- Inicie o servidor do Expo:
  - `npx expo start` (ou `npx expo start -c` para limpar o cache)

- Rodar no Android:
  - Emulador: com o Metro aberto, tecle `a`
  - Dispositivo físico: instale o app Expo Go e leia o QR Code mostrado no terminal/Expo DevTools

- Debug:
  - Use o menu do Expo DevTools (abrirá no navegador) para logs e ferramentas

## Fluxo básico do app
1. Login ou Cadastro
2. Após o cadastro, o app solicita o preenchimento do questionário BAI
3. O resultado do BAI é enviado para a API e você é redirecionado para a tela principal (Dashboard)
4. Depois, é possível refazer o BAI pelo Perfil, se necessário

## Build 
- Build nativa local:
  - Android: `npx expo run:android` (precisa do Android SDK)
- Com EAS (recomendado para produção):
  - `npm install -g eas-cli`
  - `eas login`
  - Android: `eas build -p android`
  - iOS (macOS): `eas build -p ios`

## Solução de problemas
- Limpar cache do Expo: `npx expo start -c`
- Dependências quebradas: apague `node_modules` e `package-lock.json`/`yarn.lock`, depois reinstale
- Emulador não abre: abra o Android Studio > Device Manager > inicie um AVD e depois volte ao terminal e tecle `a`
- Dispositivo não conecta ao backend: confirme o IP da `baseURL` e se ambos estão na mesma rede

## Tecnologias principais
- React Native + Expo
- React Navigation
- Context API para autenticação
- Vision Camera




