/**
 * No Emoji Extension
 *
 * Appends a system-prompt instruction so the agent never uses emojis in responses.
 *
 * Usage:
 * 1. Auto-loaded from .pi/extensions/ (this project)
 * 2. Or copy to ~/.pi/agent/extensions/ for all projects
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const NO_EMOJI_INSTRUCTION = `

IMPORTANT: Never use emojis in your responses. Do not include emoji characters, emoji shortcodes, or decorative symbols used as emojis. Use plain text only.
`;

export default function noEmojiExtension(pi: ExtensionAPI) {
	pi.on("before_agent_start", async (event) => ({
		systemPrompt: event.systemPrompt + NO_EMOJI_INSTRUCTION,
	}));
}
