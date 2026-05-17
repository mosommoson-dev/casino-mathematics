"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Formula } from "@/components/ui/Formula";
import { formatPercent } from "@/lib/utils";

async function sha256Hex(text: string): Promise<string> {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256Hex(
  key: string,
  message: string,
): Promise<string> {
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", cryptoKey, enc.encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToFraction(hex: string) {
  // first 8 hex chars → 32-bit unsigned → [0, 1)
  const u = parseInt(hex.slice(0, 8), 16);
  return u / 0x100000000;
}

function randomHex(n = 16) {
  const arr = new Uint8Array(n);
  crypto.getRandomValues(arr);
  return Array.from(arr)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

type Roll = {
  nonce: number;
  hash: string;
  fraction: number;
  number: number;
};

export function ProvablyFairDemo() {
  const [serverSeed, setServerSeed] = useState<string>("");
  const [serverHash, setServerHash] = useState<string>("");
  const [clientSeed, setClientSeed] = useState<string>("user-seed-2026");
  const [nonce, setNonce] = useState(0);
  const [rolls, setRolls] = useState<Roll[]>([]);
  const [revealed, setRevealed] = useState(false);

  const regenerateServer = useMemo(
    () => async () => {
      const seed = randomHex(32);
      const hash = await sha256Hex(seed);
      setServerSeed(seed);
      setServerHash(hash);
      setNonce(0);
      setRolls([]);
      setRevealed(false);
    },
    [],
  );

  useEffect(() => {
    regenerateServer();
  }, [regenerateServer]);

  const rollOnce = async () => {
    if (!serverSeed) return;
    const message = `${clientSeed}:${nonce}`;
    const hash = await hmacSha256Hex(serverSeed, message);
    const fraction = hexToFraction(hash);
    const number = Math.floor(fraction * 100); // 0..99
    setNonce((n) => n + 1);
    setRolls((r) => [{ nonce, hash, fraction, number }, ...r].slice(0, 16));
  };

  const verify = async (r: Roll) => {
    if (!revealed) return null;
    const hash = await hmacSha256Hex(serverSeed, `${clientSeed}:${r.nonce}`);
    return hash === r.hash;
  };

  return (
    <Card className="p-2">
      <div className="rounded-2xl bg-black/30 p-6 md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
                Commit · server seed hash (SHA-256)
              </div>
              <div className="mt-2 break-all font-mono text-xs text-[var(--color-gold-soft)]">
                {serverHash || "…"}
              </div>
              <button
                onClick={regenerateServer}
                className="mt-3 rounded-full border border-white/10 px-3 py-1 text-[11px] text-ink-2 hover:text-ink"
              >
                Новый раунд
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
              <label className="text-[10px] uppercase tracking-[0.22em] text-ink-4">
                Client seed (вы контролируете)
              </label>
              <input
                value={clientSeed}
                onChange={(e) => setClientSeed(e.target.value)}
                className="mt-2 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-sm text-ink outline-none"
              />
              <div className="mt-3 text-[10px] uppercase tracking-[0.22em] text-ink-4">
                Nonce
                <span className="ml-2 font-mono text-[var(--color-gold-soft)]">
                  {nonce}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={rollOnce}
                className="rounded-full bg-gradient-to-b from-[#efd57a] via-[#d4af37] to-[#9d7e1b] px-5 py-2.5 text-sm font-medium text-[#0c0a06]"
              >
                Сделать бросок
              </button>
              <button
                onClick={async () => {
                  for (let i = 0; i < 8; i++) await rollOnce();
                }}
                className="rounded-full border border-white/10 px-4 py-2.5 text-xs text-ink-2 hover:text-ink"
              >
                +8 бросков
              </button>
              <button
                onClick={() => setRevealed(true)}
                disabled={revealed}
                className="rounded-full border border-emerald-500/40 bg-emerald-500/[0.05] px-4 py-2.5 text-xs text-emerald-200 disabled:opacity-40"
              >
                {revealed ? "Server seed раскрыт" : "Раскрыть server seed"}
              </button>
            </div>

            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.04] p-5"
              >
                <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-300/85">
                  Server seed
                </div>
                <div className="mt-2 break-all font-mono text-xs text-emerald-100">
                  {serverSeed}
                </div>
                <p className="mt-3 text-xs text-emerald-50/80 leading-relaxed">
                  Проверьте: SHA-256(server seed) должен совпадать с опубликованным выше hash.
                  HMAC(server seed, &laquo;client:nonce&raquo;) должен давать строки ниже.
                </p>
              </motion.div>
            )}

            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
              <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-2">
                Алгоритм
              </div>
              <Formula
                expression="r = \\text{HMAC\\_SHA256}(server, \\,\\, client \\| nonce)"
                block
              />
              <Formula
                expression="f = \\text{int}(r[0..8]) / 2^{32} \\in [0,1)"
                block
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.22em] text-ink-4 mb-1">
              Журнал бросков
            </div>
            <div className="max-h-[520px] overflow-y-auto scrollbar-thin space-y-2 pr-2">
              {rolls.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-ink-4">
                  Бросков пока нет.
                </div>
              )}
              {rolls.map((r) => (
                <RollRow key={r.nonce} roll={r} verify={verify} revealed={revealed} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function RollRow({
  roll,
  verify,
  revealed,
}: {
  roll: Roll;
  verify: (r: Roll) => Promise<boolean | null>;
  revealed: boolean;
}) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    if (!revealed) return;
    verify(roll).then(setOk);
  }, [revealed, roll, verify]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl border border-white/8 bg-white/[0.02] p-3"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-xs text-ink-3">nonce #{roll.nonce}</span>
        <span className="font-mono text-xl text-[var(--color-gold-soft)]">
          {roll.number}
        </span>
      </div>
      <div className="mt-2 break-all font-mono text-[10px] text-ink-4">{roll.hash}</div>
      <div className="mt-1 flex items-center justify-between text-[10px]">
        <span className="text-ink-4">f = {formatPercent(roll.fraction, 4)}</span>
        {revealed && ok !== null && (
          <span
            className={
              ok ? "text-emerald-300" : "text-rose-300"
            }
          >
            {ok ? "verified" : "INVALID"}
          </span>
        )}
      </div>
    </motion.div>
  );
}
