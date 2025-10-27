import Member from "../../models/Member.js";

import Invite from "../../models/Invite.js";

import type { Request, Response } from "express";

const getUsersOrganization = async (req: Request, res: Response) => {
  // @ts-expect-error user will exist from auth middleware
  const userId = req?.user?._id;

  if (!userId) {
    res.status(401).send();
    return;
  }

  const usersOrg = await Member.findOne({ userId });

  res.send(usersOrg);
};

const addMemberToOrganization = async (req: Request, res: Response) => {
  const invitecode = req.body.inviteCode;
  const password = req.body?.password;
  const user = req.user;

  if (!invitecode) {
    res.status(401).send();
    return;
  }

  //find invite
  const foundInvite = await Invite.findOne({ inviteCode: invitecode });

  //verify invite code and optional password
  if (!foundInvite) {
    res.status(401).send();
    return;
  }

  if (foundInvite.password && foundInvite.password !== password) {
    res.status(401).send();
    return;
  }

  //create organization member entry
  const newMember = new Member({
    user: user?.appUserId,
    roles: ["read"],
    organization: foundInvite.organization,
  });

  await newMember.save();

  //return status 201
  res.status(201).send();
};
export default { getUsersOrganization, addMemberToOrganization };
