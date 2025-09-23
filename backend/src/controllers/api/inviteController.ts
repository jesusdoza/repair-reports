import Invite from "../../models/Invite.js";
import Member from "../../models/Member.js";
import { v4 as uuidv4 } from "uuid";
import type { Request, Response } from "express";
// import type Organization from "../../models/Organization.js";

//get specific invite
const getInvite = async (req: Request, res: Response) => {
  const inviteCode = req.params["invitecode"] || "";
  const password = req.query.password || "";
  // console.log("invitePassword", password);
  // console.log("inviteCode", inviteCode);

  try {
    if (!inviteCode) throw new Error("no invite code or phrase");

    const invite = await Invite.findOne({
      inviteCode,
      password,
    }).lean();

    if (!invite) {
      res.status(404).send({ inviteCode });
      return;
    }

    if (invite.password !== password) {
      res.status(404).send({ inviteCode });
      return;
    }

    res.send({
      organization: invite.organizationName,
      message: "invite found",
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to get invite",
      invite: { inviteCode },
    });
  }
};

//get all invites user has created
const getUsersInvites = async (req: Request, res: Response) => {
  // @ts-expect-error req will have user
  const userId = req.user._id;
  try {
    const invites = await Invite.find({ createdBy: userId }).lean();

    if (invites.length === 0) {
      res.status(404).send({
        message: "no invites found",
      });
      return;
    }

    res.send({ invites });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to get users invites",
    });
  }
};

//create single invite
type Invite = {
  inviteCode: string;
  groupsId: string[];
  createdAt: Date;
  createdBy: string;
};

const postInvite = async (req: Request, res: Response) => {
  // @ts-expect-error req will have user
  const userId = req.user._id;
  const { password, organizationId } = req.body;

  //no groups provided to create invite
  if (!organizationId) {
    res.status(404).send({ message: "no organization provided" });
    return;
  }

  // const allowedGroups: [{ id: string, name: string }] = [];
  let allowedToInvite = false;
  try {
    allowedToInvite = await verifyOrgInviteRole(organizationId, userId);

    //not allowed to invite in any group
    if (!allowedToInvite) throw Error("User Not Allowed");
  } catch (error: any) {
    console.error("error.message", error.message);

    res.status(401).send({
      message: "failed to create invite",
      error: error.message,
      organizationId,
    });
    return;
  }

  //must be unique invite code
  const newInvite = new Invite({
    inviteCode: uuidv4().slice(0, 6).toUpperCase(),
    password,
    groups: allowedToInvite,
    createdBy: userId,
  });

  try {
    await newInvite.save();
    res.send({ newInvite });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to create invite",
      error: error.message,
    });
  }
};

//delete invite
const deleteInvite = async (req: Request, res: Response) => {
  // @ts-expect-error req will have user
  const userId = String(req.user._id);

  const inviteCode = req.params.inviteCode;

  if (inviteCode === undefined) {
    res.status(400).send({
      message: "no invite code provided",
    });
    return;
  }

  try {
    const invite = await Invite.findOne({ inviteCode, createdBy: userId });

    if (!invite) {
      res.status(400).send({
        message: "invite not found",
        inviteCode,
      });
      return;
    }

    await invite.deleteOne();

    res.send({
      message: "invite deleted",
      inviteCode,
    });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).send({
      message: "failed to delete invite",
      inviteCode,
    });
  }
};

//utility functions
//pass in group ids to verify user is member with valid role
//todo verify user has correct permissions to create invite
//TODO create an allowed group
async function verifyOrgInviteRole(orgId: string, userId: string) {
  const allowed = await Member.findOne({
    userId,
    organization: orgId,
  }).lean();

  return !!allowed;
}

export default { getInvite, getUsersInvites, postInvite, deleteInvite };
