/**
 * Turn the title of a post to a slug
 */
export const slugify = (text: string): string => {
	return text
		.toLowerCase()
		.replace(/[^a-zA-Z0-9]+/g, "-")
		.replace(/^-+|-+$/g, "-")
		.trim();
};
