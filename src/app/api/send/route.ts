/* eslint-disable import/no-anonymous-default-export */
import { ReadyTemplate } from "@/components/blocks/ready";
import type { NextApiRequest, NextApiResponse } from "next";

import { Resend } from "resend";

const resend = new Resend(process.env.MAIL_KEY);

export const send = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["eclipselucky@gmail.com"],
    subject: "Hello world",
    react: await ReadyTemplate({
      tel: "tel",
      checkbox1: true,
      checkbox2: true,
      email: "mail",
      name: "123",
    }),
  });

  if (error) {
    return res.status(400).json(error);
  }

  res.status(200).json(data);
};
