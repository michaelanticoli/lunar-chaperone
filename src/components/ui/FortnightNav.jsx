import React from 'react';
import { Link } from 'react-router-dom';
import { Label } from './Typography';
import { getNeighbors } from '../../data/volumes';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronLeft, FiChevronRight } = FiIcons;

const PHASE_GLYPH = { waxing: '🌒', waning: '🌘', eclipse: '⊙' };

export function FortnightNav({ vol }) {
  if (!vol) return null;

  const { prev, next } = getNeighbors(vol.id);
  const progressPct = Math.round((vol.fortnight / 26) * 100);

  return (
    <nav className="w-full py-6 px-6 md:px-12 border-t border-b border-ink/8 bg-paper/80 backdrop-blur-sm print:hidden">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <div className="flex-1 flex justify-start">
          {prev ? (
            <Link
              to={`/cycle/${prev.fortnight}`}
              className="group flex items-center gap-3 text-left hover:text-gold transition-colors"
            >
              <SafeIcon icon={FiChevronLeft} className="text-xl opacity-40 group-hover:opacity-100 shrink-0" />
              <div className="hidden sm:block">
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="text-xs">{PHASE_GLYPH[prev.phase] ?? '○'}</span>
                  <Label className="text-[10px] opacity-40">Workbook {prev.fortnight}</Label>
                </div>
                <p className="text-sm font-serif italic leading-tight line-clamp-1">{prev.title}</p>
              </div>
            </Link>
          ) : (
            <span className="opacity-20 select-none">
              <SafeIcon icon={FiChevronLeft} className="text-xl" />
            </span>
          )}
        </div>

        <div className="flex flex-col items-center gap-2 min-w-[160px]">
          <div className="flex items-center gap-2">
            <span className="text-sm">{PHASE_GLYPH[vol.phase] ?? '○'}</span>
            <Label className="text-[11px] tracking-widest">
              Workbook {vol.fortnight} of 26
            </Label>
          </div>
          <div className="w-full h-px bg-ink/10 relative overflow-hidden rounded-full">
            <div
              className="absolute left-0 top-0 h-full bg-gold transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          {next ? (
            <Link
              to={`/cycle/${next.fortnight}`}
              className="group flex items-center gap-3 text-right hover:text-gold transition-colors"
            >
              <div className="hidden sm:block">
                <div className="flex items-center justify-end gap-1 mb-0.5">
                  <Label className="text-[10px] opacity-40">Workbook {next.fortnight}</Label>
                  <span className="text-xs">{PHASE_GLYPH[next.phase] ?? '○'}</span>
                </div>
                <p className="text-sm font-serif italic leading-tight line-clamp-1">{next.title}</p>
              </div>
              <SafeIcon icon={FiChevronRight} className="text-xl opacity-40 group-hover:opacity-100 shrink-0" />
            </Link>
          ) : (
            <span className="opacity-20 select-none">
              <SafeIcon icon={FiChevronRight} className="text-xl" />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
