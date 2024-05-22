import { create } from "zustand";
import { persist } from "zustand/middleware";
import confetti from "canvas-confetti";
import { Question } from "../types";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionStore = create<State>()(
  persist(
    (set, get) => ({
      loading: false,
      questions: [],
      currentQuestion: 0,

      fetchQuestions: async (limit: number) => {
        const res = await fetch("https://darkkay007.github.io/QuizJava/data.json");
        const json = await res.json();

        const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
        set({ questions });
      },

      selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get();
        const newQuestions = questions.map((q) => ({ ...q }));
        const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
        const questionInfo = newQuestions[questionIndex];
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;
        if (isCorrectUserAnswer) confetti();

        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        };
        set({ questions: newQuestions });
      },

      goNextQuestion: () => {
        const { currentQuestion, questions } = get();
        const nextQuestion = currentQuestion + 1;

        if (nextQuestion < questions.length) {
          set({ currentQuestion: nextQuestion });
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestion } = get();
        const previousQuestion = currentQuestion - 1;

        if (previousQuestion >= 0) {
          set({ currentQuestion: previousQuestion });
        }
      },
      reset: () => {
        set({ questions: [], currentQuestion: 0 });
      },
    }),
    {
      name: "quiz",

    }
  )
);
