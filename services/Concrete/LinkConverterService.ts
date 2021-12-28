import { Request, Response, NextFunction } from "express";
import { ILinkConverterService } from "../Abstract/ILinkConverterService";
import ToWebUrlBase from "../../converters/toweburls/ToWebUrlBase";
import ToDeepLinkBase from "../../converters/todeeplinks/ToDeepLinkBase";
import { IToDeepLinkConv } from "../../converters/IToDeepLinkConv";
import { IToWebUrlService } from "../../converters/IToWebUrlService";
import { deepLinkType, webUrlType } from "../../data/models/LinkTypes";
import ConvertedLinkRepo from "../../data/mysqlrepo/ConvertedLinkRepo";
import { ConvertedLinkEnums } from "../../helpers/enums/ConvertedLinkEnums";
import { redisCacheMiddleware } from "../../server";
export default class LinkConverterService implements ILinkConverterService {
  async toDeepLink(req: Request, res: Response, next: NextFunction) {
    const deepLinker: IToDeepLinkConv = new ToDeepLinkBase();
    let deepLink: deepLinkType = deepLinker.toDeepLink(req.body.webUrl);
    const saveRowObject = {
      source: req.body.webUrl,
      target: deepLink,
      direction: ConvertedLinkEnums.ConversionDirection.TO_DEEPLINK,
    };
    ConvertedLinkRepo.saveConvertedLink(saveRowObject);
    const key = redisCacheMiddleware.generateCacheKey(Object.values(req.body!)[0]!,req.route.path);
    await redisCacheMiddleware.redisClient.setex(
      key,
      process.env.REDIS_CACHE_TIMEOUT,
      deepLink
    );
    res.status(200).json({
      success : true,
      Response: deepLink,
    });
  }

  async toLink(req: Request, res: Response, next: NextFunction) {
    const linkConverter: IToWebUrlService = new ToWebUrlBase();
    let webUrl: webUrlType = linkConverter.toWebUrl(req.body.deepLink);
    const saveRowObject = {
      source: req.body.deepLink,
      target: webUrl,
      direction: ConvertedLinkEnums.ConversionDirection.TO_WEBURL,
    };
    ConvertedLinkRepo.saveConvertedLink(saveRowObject);
    const key = redisCacheMiddleware.generateCacheKey(Object.values(req.body!)[0]!,req.route.path);
    await redisCacheMiddleware.redisClient.setex(
      key,
      process.env.REDIS_CACHE_TIMEOUT,
      webUrl
    );
    return res.status(200).json({
      success : true,
      Response: webUrl,
    });
  }
}
