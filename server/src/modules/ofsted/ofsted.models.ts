export interface IShoolSummary {
  readonly id: string;
  readonly webLink: string;
  readonly urn: string;
  readonly name: string;
  readonly address: string;
  readonly telephone: string | undefined;
  readonly lat: number;
  readonly long: number;
  readonly rating: number;
  readonly localAuthority: string;
  readonly gender: number;
  readonly minorGroup: string;
  readonly schoolType: string;
  readonly isTypeFlag: number;
  readonly lastInspDate: Date | undefined;
}