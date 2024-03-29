import { ConsoleLogger } from '@aws-amplify/core';
import type { InAppMessageCampaign as PinpointInAppMessage } from '@aws-amplify/core/internals/aws-clients/pinpoint';
import {
	InAppMessage,
	InAppMessageContent,
	InAppMessageLayout,
	InAppMessagingEvent,
} from '../../types';
import { AWSPinpointMessageEvent, MetricsComparator } from './types';
export declare const logger: ConsoleLogger;
export declare const dispatchInAppMessagingEvent: (
	event: string,
	data: any,
	message?: string
) => void;
export declare const recordAnalyticsEvent: (
	event: AWSPinpointMessageEvent,
	message: InAppMessage
) => void;
export declare const getStartOfDay: () => string;
export declare const matchesEventType: (
	{ CampaignId, Schedule }: PinpointInAppMessage,
	{ name: eventType }: InAppMessagingEvent
) => any;
export declare const matchesAttributes: (
	{ CampaignId, Schedule }: PinpointInAppMessage,
	{ attributes }: InAppMessagingEvent
) => boolean;
export declare const matchesMetrics: (
	{ CampaignId, Schedule }: PinpointInAppMessage,
	{ metrics }: InAppMessagingEvent
) => boolean;
export declare const getComparator: (operator: string) => MetricsComparator;
export declare const isBeforeEndDate: ({
	Schedule,
}: PinpointInAppMessage) => boolean;
export declare const isQuietTime: (message: PinpointInAppMessage) => boolean;
export declare const clearMemo: () => void;
export declare const interpretLayout: (layout: string) => InAppMessageLayout;
export declare const extractContent: ({
	InAppMessage: message,
	platform,
}: PinpointInAppMessage & {
	platform?: 'Android' | 'IOS' | 'Web';
}) => InAppMessageContent[];
export declare const extractMetadata: ({
	InAppMessage,
	Priority,
	Schedule,
	TreatmentId,
}: PinpointInAppMessage) => any;
