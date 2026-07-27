'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useAddFrame, useNotification } from '@coinbase/onchainkit/minikit';
import { useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';

type MiniAppNotificationCardProps = {
  isInMiniApp: boolean;
  fid?: number;
  isAdded: boolean;
  hasNotificationDetails: boolean;
};

export function MiniAppNotificationCard({
  isInMiniApp,
  fid,
  isAdded,
  hasNotificationDetails,
}: MiniAppNotificationCardProps) {
  const addFrame = useAddFrame();
  const sendNotification = useNotification();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<'neutral' | 'success' | 'error'>('neutral');
  const [now, setNow] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const status = useMemo(() => {
    if (!isInMiniApp) {
      return {
        label: 'Browser',
        detail: 'Open in Farcaster',
      };
    }

    if (!isAdded) {
      return {
        label: 'Not Added',
        detail: 'Add miniapp',
      };
    }

    if (!hasNotificationDetails) {
      return {
        label: 'Token Pending',
        detail: 'Await client token',
      };
    }

    return {
      label: 'Notifications Ready',
      detail: 'Push live',
    };
  }, [hasNotificationDetails, isAdded, isInMiniApp]);

  const feedbackClassName =
    feedbackTone === 'success'
      ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
      : feedbackTone === 'error'
        ? 'border-rose-300 bg-rose-50 text-rose-900'
        : 'border-slate-200 bg-slate-50 text-slate-700';

  const addFrameMutation = useMutation({
    mutationFn: async () => addFrame(),
    onMutate: () => {
      setFeedback(null);
    },
    onSuccess: (details) => {
      if (details) {
        setFeedbackTone('success');
        setFeedback('ONabat was added successfully. Notification delivery is ready to test.');
      } else {
        setFeedbackTone('neutral');
        setFeedback('Add flow completed without notification details. Farcaster may require a permission refresh.');
      }
    },
    onError: (error) => {
      setFeedbackTone('error');
      setFeedback(error instanceof Error ? error.message : 'Failed to add the miniapp.');
    },
  });

  const sendTestMutation = useMutation({
    mutationFn: async () =>
      sendNotification({
        title: 'ONabat alert',
        body: 'Notifications are live for this miniapp session.',
      }),
    onMutate: () => {
      setFeedback(null);
    },
    onSuccess: (delivered) => {
      if (delivered) {
        setFeedbackTone('success');
        setFeedback('Test notification submitted to Farcaster. Check your client inbox.');
      } else {
        setFeedbackTone('error');
        setFeedback('Notification request was rejected. Confirm the miniapp is added and notifications are enabled in Farcaster.');
      }
    },
    onError: (error) => {
      setFeedbackTone('error');
      setFeedback(error instanceof Error ? error.message : 'Failed to send a test notification.');
    },
  });

  const mutationStateLabel = addFrameMutation.isPending
    ? 'Adding to Farcaster...'
    : sendTestMutation.isPending
      ? 'Sending test ping...'
      : addFrameMutation.isError || sendTestMutation.isError
        ? 'Last action failed'
        : addFrameMutation.isSuccess || sendTestMutation.isSuccess
          ? 'Last action succeeded'
          : 'No pending actions';

  const lastMutationAt = Math.max(
    addFrameMutation.submittedAt || 0,
    sendTestMutation.submittedAt || 0
  );

  const mutationAgeSec = lastMutationAt > 0 ? Math.max(Math.floor((now - lastMutationAt) / 1000), 0) : null;

  const handleAddFrame = async () => {
    setFeedback(null);
    await addFrameMutation.mutateAsync();
  };

  const handleSendTest = async () => {
    setFeedback(null);
    await sendTestMutation.mutateAsync();
  };

  return (
    <section className="mb-6 rounded-3xl border border-slate-900/10 bg-white/88 p-4 shadow-[0_20px_40px_rgba(15,23,42,0.08)] backdrop-blur sm:p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-900/12 bg-slate-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700"
            >
              Farcaster Notifications
            </button>
            {fid ? (
              <button
                type="button"
                className="inline-flex items-center rounded-full border border-cyan-300/45 bg-cyan-50 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-900"
              >
                FID {fid}
              </button>
            ) : null}
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.06)]"
            >
              {status.label}
              <div className="mt-1 text-xs text-slate-600">{mutationStateLabel}</div>
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              className="rounded-2xl border border-slate-900/10 bg-white/92 px-3 py-3 text-left font-semibold text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.06)]"
            >
              {status.detail}
              <div className="mt-1 text-xs text-slate-600">{mutationAgeSec === null ? 'No actions yet' : `Updated ${mutationAgeSec}s ago`}</div>
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ y: -1 }}
              className={`rounded-2xl border px-3 py-3 text-left font-semibold shadow-[0_10px_22px_rgba(15,23,42,0.06)] ${
                hasNotificationDetails
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                  : 'border-slate-900/10 bg-white/92 text-slate-900'
              }`}
            >
              {hasNotificationDetails ? 'Push Ready' : 'Push Locked'}
              <div className="mt-1 text-xs text-slate-600">{isInMiniApp ? 'Miniapp runtime' : 'Browser runtime'}</div>
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => void handleAddFrame()}
            disabled={!isInMiniApp || addFrameMutation.isPending || isAdded}
            className="rounded-2xl border border-slate-900/12 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {addFrameMutation.isPending ? 'Adding...' : isAdded ? 'Miniapp Added' : 'Add to Farcaster'}
          </button>
          <button
            type="button"
            onClick={() => void handleSendTest()}
            disabled={!isInMiniApp || !hasNotificationDetails || sendTestMutation.isPending}
            className="rounded-2xl border border-cyan-300/55 bg-cyan-50 px-4 py-2 text-sm font-semibold text-cyan-950 transition hover:bg-cyan-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
          >
            {sendTestMutation.isPending ? 'Sending...' : 'Send Test Ping'}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {feedback ? (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className={`mt-4 rounded-2xl border px-3 py-2 text-sm ${feedbackClassName}`}
          >
            {feedback}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}