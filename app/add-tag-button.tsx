"use client";

import { useFormStatus } from "react-dom";

export function AddTagButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Carregando..." : "Salvar tag"}{" "}
      {/* Adicionando reticências para indicar carregamento */}
    </button>
  );
}
