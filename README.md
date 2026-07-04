# Slick Style Barbershop — Next.js

Projeto real em Next.js 16 + React + Tailwind CSS + Framer Motion + GSAP ScrollTrigger.
Testado com `npm install && npm run build` antes da entrega — build limpo, sem erros de TypeScript.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Subir pro GitHub e publicar na Vercel (grátis)

1. Crie um repositório novo no GitHub (pode ser privado).
2. Dentro desta pasta:
   ```bash
   git init
   git add .
   git commit -m "primeira versão do site"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
   git push -u origin main
   ```
3. Acesse **vercel.com**, entre com sua conta GitHub, clique em **Add New → Project**.
4. Selecione o repositório que você acabou de subir. A Vercel detecta Next.js automaticamente — não precisa configurar nada.
5. Clique em **Deploy**. Em 1–2 minutos você tem uma URL pública (`seuprojeto.vercel.app`).

Toda vez que você der `git push` de novo, a Vercel republica sozinha.

## Onde editar pra reaproveitar em outro cliente

Um único arquivo concentra **todo** o conteúdo do site: `lib/config.ts`.
Nome da barbearia, endereço, WhatsApp, serviços, preços, produtos, depoimentos, textos do herói e do CTA — tudo vem de lá. Os componentes em `components/` não precisam ser tocados pra trocar de cliente.

## Onde entram as fotos reais

Toda foto que falta está marcada com o componente `<PhotoSlot label="..." />` — aparece no site como uma caixa com borda tracejada e uma legenda dizendo exatamente que foto vai ali e em que proporção. Locais:

- `components/Hero.tsx` — foto de fundo do herói (tela cheia)
- `components/ProductCarousel.tsx` — foto de cada produto (quadrada)
- `components/TransformGallery.tsx` — pares de antes/depois
- `components/Blog.tsx` — thumbnail de cada post (16:10)

Quando tiver a imagem final, troque o `<PhotoSlot .../>` correspondente por:

```tsx
import Image from "next/image";

<div className="relative w-full aspect-square rounded-lg overflow-hidden">
  <Image src="/produtos/pincel.jpg" alt="Pincel de barba" fill className="object-cover" />
</div>
```

Coloque os arquivos de imagem dentro da pasta `public/`.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **Tailwind CSS** — paleta de marca configurada em `tailwind.config.ts`
- **Framer Motion** — revelações ao rolar, título cinético letra a letra, ícones flutuantes com parallax
- **GSAP + ScrollTrigger** — seção de galeria com scroll vertical convertido em movimento horizontal (pin + scrub)

Todas as interações funcionam de forma idêntica em toque e em clique — nenhum efeito depende exclusivamente de hover de mouse.
