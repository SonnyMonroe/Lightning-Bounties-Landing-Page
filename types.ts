export interface BountyDraft {
  title: string;
  description: string;
  tags: string[];
  estimatedSats: number;
}

export interface Metric {
  metric: string;
  value: number;
}

export interface Developer {
  avatarUrl: string;
  developer: string;
  claimedCount: number;
  rewardsInSats: number;
}

export interface UnclaimedIssue {
  title: string;
  repository: string;
  rewardInSats: number;
}

export interface Bounty {
  title: string;
  description: string;
  tags: string[];
  rewardSats: number;
  createdAt: string;
  postedBy: string;
}

export interface ApiData {
  metrics: Metric[];
  topDevelopers: Developer[];
  topIssuesNotClaimed: UnclaimedIssue[];
}