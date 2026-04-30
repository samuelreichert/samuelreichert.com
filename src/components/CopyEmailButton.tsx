import { useState } from 'react';

interface Props {
  email: string;
}

export default function CopyEmailButton({ email }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={handleClick}>
      {copied ? 'Copied!' : email}
    </button>
  );
}
