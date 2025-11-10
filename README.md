# ProjetoTCC — App Mobile (React Native + Expo)

Aplicativo mobile desenvolvido em React Native com Expo para monitoramento e questionários (ex.: BAI).

## Pré-requisitos
- Node.js 18+ e npm ou Yarn
- Expo (usando npx, não precisa instalar global)
- Android Studio (emulador) ou um dispositivo Android com Expo Go
- Backend da API rodando e acessível na mesma rede

## Configuração do projeto
1. Clone o repositório:
   - `git clone <URL_DO_REPO>`
   - `cd ProjetoTCC`

2. Instale as dependências:
   - `npm install` ou `yarn`

3. Configure a API (baseURL):
   - Abra `src/constants/api.js` e ajuste a `baseURL` para o endereço do seu backend (ex.: `http://SEU_IP:3000`).
   - Em Windows, para testar no emulador ou dispositivo, use o IP local da sua máquina (ex.: `http://192.168.0.10:3000`).

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

## Build (opcional)
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
- Expo Google Fonts, Splash Screen
