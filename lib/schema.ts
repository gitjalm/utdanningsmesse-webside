import z from "zod";

export const registerSchema = z.object({
  email: z.email("Invalid email address!"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(64, "Name must be at most 64 characters"),
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(32, "Username must be at most 32 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  admin: z.boolean(),
});

export const loginSchema = z.object({
  username: z.string().min(1, "Brukernavn kan ikke være tomt"),
  password: z.string().min(1, "Passord kan ikke være tomt"),
});

export const newsSchema = z.object({
  title: z.string().min(1, "Tittel kan ikke være tomt"),
  content: z.string().min(1, "Innhold kan ikke være tomt"),
  category: z.enum(
    ["INFO", "ALERT", "EVENT"],
    "Kategori må være INFO, ALERT eller EVENT",
  ),
  status: z.enum(
    ["PUBLISERT", "ARKIVERT", "UTKAST"],
    "Kategori må være PUBLISERT, ARKIVERT eller UTKAST",
  ),
  image_url: z.url("Bilde URL må være en gyldig URL"),
  video: z.array(z.url("Video URL må være en gyldig URL")).optional(),
});
