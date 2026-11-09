/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Vantage Assessment Session Runner
 * Borderless, Corner-to-Corner Layout.
 */

import React, { useState, useEffect, useRef } from 'react';
import { AssessmentSection, CandidateResponse, AssessmentResultRecord } from '../../types';
import { calculatePsychometricScores } from '../../services/scoringEngine';
import confetti from 'canvas-confetti';

interface AssessmentSessionRunnerProps {
  sections: AssessmentSection[];
  onComplete: (results: AssessmentResultRecord) => void;
  onExit: () => void;
}

export const AssessmentSessionRunner: React.FC<AssessmentSessionRunnerProps> = ({
  sections,
  onComplete,
  onExit,
}) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<CandidateResponse[]>([]);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(360);

  // Reaction time tracker
  const questionStartTimeRef = useRef<number>(Date.now());

  const currentSection = sections[currentSectionIndex];
  const questions = currentSection?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // Flattened total progress
  const totalQuestionsAllSections = sections.reduce((acc, s) => acc + s.questions.length, 0);
  const currentGlobalQuestionNum =
    sections.slice(0, currentSectionIndex).reduce((acc, s) => acc + s.questions.length, 0) +
    currentQuestionIndex +
    1;
  const progressPct = Math.round((currentGlobalQuestionNum / totalQuestionsAllSections) * 100);

  // Timer logic for timed sections
  useEffect(() => {
    if (!currentSection?.isTimed || isPaused) return;

    setTimeRemainingSeconds(currentSection.totalTimeSeconds || 360);
    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleNextQuestion(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSectionIndex, isPaused]);

  // Reset reaction time on question change
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [currentSectionIndex, currentQuestionIndex]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;

      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= questions[currentQuestionIndex]?.options.length) {
        const opt = questions[currentQuestionIndex].options[num - 1];
        if (opt) {
          handleSelectOption(opt.id, opt.scoreValue);
        }
      } else if (e.key === 'Enter') {
        const hasAnswer = responses.some((r) => r.questionId === currentQuestion?.id);
        if (hasAnswer) {
          handleNextQuestion(false);
        }
      } else if (e.key === 'ArrowLeft') {
        handlePreviousQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex, currentQuestionIndex, questions, responses, isPaused]);

  // Current answer if already selected
  const existingResponse = responses.find((r) => r.questionId === currentQuestion?.id);

  const handleSelectOption = (optionId: string, scoreValue?: number) => {
    const elapsed = Date.now() - questionStartTimeRef.current;
    const newResponse: CandidateResponse = {
      questionId: currentQuestion.id,
      category: currentSection.category,
      dimension: currentQuestion.dimension,
      selectedOptionId: optionId,
      numericValue: scoreValue,
      reactionTimeMs: elapsed,
      timestamp: new Date().toISOString(),
    };

    setResponses((prev) => {
      const filtered = prev.filter((r) => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });
  };

  const handleNextQuestion = (forcedByTimer: boolean = false) => {
    if (!forcedByTimer && !existingResponse) {
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore in non-browser env
      }
      const calculatedResults = calculatePsychometricScores(sections, responses);
      onComplete(calculatedResults);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentSectionIndex > 0) {
      const prevSec = sections[currentSectionIndex - 1];
      setCurrentSectionIndex((prev) => prev - 1);
      setCurrentQuestionIndex(prevSec.questions.length - 1);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!currentQuestion) {
    return (
      <div className="p-8 text-center text-slate-400">
        Assessment configuration is loading...
      </div>
    );
  }

  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 py-8">
      {/* Top Header / Progress Bar */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>{currentSection.title}</span>
              <span aria-hidden="true">·</span>
              <span>Section {currentSectionIndex + 1} of {sections.length}</span>
            </div>
            <h2 className="text-base font-semibold text-white">
              Item {currentGlobalQuestionNum} of {totalQuestionsAllSections}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {currentSection.isTimed && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950 rounded-lg text-xs font-mono tabular-nums text-teal-400">
                <span className="text-slate-400">Timer:</span>
                <span>{formatTimer(timeRemainingSeconds)}</span>
              </div>
            )}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-950 rounded-lg transition-colors"
            >
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button
              onClick={onExit}
              className="px-3.5 py-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 bg-slate-950 rounded-lg transition-colors"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress bar line */}
        <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
          <div
            className="bg-teal-400 h-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      {isPaused ? (
        <div className="bg-slate-900 rounded-2xl p-12 text-center w-full">
          <h3 className="text-lg font-bold text-white mb-2">Assessment Paused</h3>
          <p className="text-sm text-slate-400 mb-6">
            Your progress and responses are autosaved in memory. Take a breath and resume whenever you are ready.
          </p>
          <button
            onClick={() => setIsPaused(false)}
            className="px-6 py-3 text-xs font-semibold text-slate-950 bg-teal-400 hover:bg-teal-300 rounded-xl transition-colors"
          >
            Resume Assessment
          </button>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 shadow-xl w-full">
          {/* Question instructions / context */}
          <div className="text-xs text-slate-400 mb-6 pb-4 bg-slate-950/40 p-4 rounded-xl">
            <span>{currentSection.instructions}</span>
          </div>

          {/* Prompt */}
          <h3 className="text-xl sm:text-2xl font-medium text-white mb-8 leading-relaxed">
            {currentQuestion.prompt}
          </h3>

          {/* Dynamic Options Rendering */}
          <div className="space-y-3.5 mb-10">
            {currentQuestion.options.map((opt, oIdx) => {
              const isSelected = existingResponse?.selectedOptionId === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id, opt.scoreValue)}
                  className={`w-full text-left p-4 sm:p-5 rounded-xl transition-all flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-teal-950/60 text-teal-100 shadow-sm'
                      : 'bg-slate-950 text-slate-200 hover:bg-slate-950/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded bg-slate-900 text-slate-400 font-mono text-[11px] flex items-center justify-center shrink-0">
                      {oIdx + 1}
                    </span>
                    <span className="text-sm sm:text-base">{opt.text}</span>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-teal-400 text-slate-950'
                        : 'bg-slate-800'
                    }`}
                  >
                    {isSelected && <span className="block w-2 h-2 rounded-full bg-slate-950" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom Navigation Controls */}
          <div className="flex items-center justify-between pt-6">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentSectionIndex === 0 && currentQuestionIndex === 0}
              className={`px-5 py-2.5 text-xs font-medium rounded-xl transition-colors ${
                currentSectionIndex === 0 && currentQuestionIndex === 0
                  ? 'text-slate-600 bg-slate-950/40 cursor-not-allowed'
                  : 'text-slate-300 hover:text-white bg-slate-950 hover:bg-slate-850'
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => handleNextQuestion(false)}
              disabled={!existingResponse}
              className={`px-7 py-3 text-xs font-semibold rounded-xl transition-all shadow-sm ${
                !existingResponse
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-teal-400 text-slate-950 hover:bg-teal-300'
              }`}
            >
              {currentGlobalQuestionNum === totalQuestionsAllSections
                ? 'Submit & Generate Career Intelligence'
                : 'Next Question'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
