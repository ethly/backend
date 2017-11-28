// @flow

import {
  LinkSpecification,
} from 'api/models/db/LinkSpecification'

export interface LinksApi {

  listAllLinks(): Promise<Array<LinkSpecification>>;

  createLink(link: LinkSpecification): Promise<boolean>;
}
