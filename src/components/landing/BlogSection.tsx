/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Editorial Blog & Science Publications Section
 * 4 deep-dive articles with high-resolution visual covers explaining the platform, psychometrics, and governance.
 */

import React, { useState } from 'react';
import { PLATFORM_BLOG_ARTICLES, BlogArticle } from '../../data/blogArticles';

interface BlogSectionProps {
  onNavigate: (view: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate }) => {
  const [activeArticle, setActiveArticle] = useState<BlogArticle | null>(null);

  return (
    <section className="px-6 sm:px-10 lg:px-16 w-full text-left space-y-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-mono text-teal-400 uppercase tracking-widest block">
          Editorial & Scientific Architecture
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How Vantage Works: Science, Telemetry & Governance
        </h2>
        <p className="text-sm text-slate-300 leading-relaxed">
          Explore in-depth technical analysis explaining our adaptive psychometric testing, econometric occupational matching, and ethical AI safeguards.
        </p>
      </div>

      {/* 4 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {PLATFORM_BLOG_ARTICLES.map((article, index) => (
          <article
            key={article.id}
            className="bg-slate-900 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:bg-slate-850 transition-all shadow-sm group text-left cursor-pointer"
            onClick={() => setActiveArticle(article)}
          >
            <div className="space-y-4">
              {/* Cover Image Banner */}
              <div className="w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950 relative">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-teal-400 font-bold uppercase">
                  {article.category}
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm text-[10px] font-mono text-slate-300">
                  {article.readTime}
                </div>
              </div>

              {/* Category, Date & Read Time */}
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
                <span className="text-[11px] text-slate-400">
                  ESSAY 0{index + 1}
                </span>
                <span className="text-slate-500 text-[11px]">{article.publishedDate}</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-teal-300 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {article.subtitle}
                </p>
              </div>

              {/* Summary snippet */}
              <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                {article.summary}
              </p>

              {/* Author pill */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 text-teal-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {article.author.avatarInitials}
                </div>
                <div>
                  <span className="text-xs font-semibold text-white block">{article.author.name}</span>
                  <span className="text-[11px] text-slate-400 block">{article.author.role}</span>
                </div>
              </div>
            </div>

            {/* Read Button */}
            <div className="pt-5 mt-5 flex items-center justify-between">
              <span className="text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                Read Full Scientific Essay →
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {article.keyTakeaways.length} Key Takeaways
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Interactive Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl text-left my-8 max-h-[92vh] overflow-y-auto space-y-8">
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-teal-400 uppercase tracking-widest mb-2">
                  <span>{activeArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeArticle.publishedDate}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                  {activeArticle.title}
                </h1>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {activeArticle.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="text-slate-400 hover:text-white transition-colors text-xl p-2 shrink-0"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Full-width Modal Cover Image */}
            <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-950">
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Author Credit Card */}
            <div className="flex items-center gap-4 p-4 bg-slate-950/70 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-teal-400 font-mono text-sm font-bold flex items-center justify-center shrink-0">
                {activeArticle.author.avatarInitials}
              </div>
              <div>
                <strong className="text-sm font-semibold text-white block">{activeArticle.author.name}</strong>
                <span className="text-xs text-slate-400 block">{activeArticle.author.role}</span>
              </div>
            </div>

            {/* Key Takeaways Box */}
            <div className="p-6 bg-slate-950/80 rounded-xl space-y-3">
              <span className="text-xs font-mono text-teal-400 uppercase font-bold tracking-wider block">
                Executive Synthesis & Key Takeaways
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {activeArticle.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-400 font-bold shrink-0">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Sections */}
            <div className="space-y-8 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeArticle.contentSections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h2 className="text-base sm:text-lg font-bold text-white pt-2">
                    {sec.heading}
                  </h2>
                  {sec.body.map((para, pIdx) => (
                    <p key={pIdx} className="text-slate-300 leading-relaxed">
                      {para}
                    </p>
                  ))}
                  {sec.callout && (
                    <div className="p-4 bg-slate-950/60 rounded-xl text-teal-200 text-xs italic pl-5">
                      "{sec.callout}"
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer with Related Platform Action */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveArticle(null)}
                className="text-xs text-slate-400 hover:text-white transition-colors order-2 sm:order-1"
              >
                Close Article
              </button>

              <button
                onClick={() => {
                  const target = activeArticle.relatedAction.targetView;
                  setActiveArticle(null);
                  onNavigate(target);
                }}
                className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors shadow-sm order-1 sm:order-2"
              >
                {activeArticle.relatedAction.label} →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
