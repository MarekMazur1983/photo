﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace pastephoto
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "save",
                url: "save",
                defaults: new { controller = "Home", action = "Save", id = UrlParameter.Optional }
            );
            routes.MapRoute(
              name: "login",
              url: "login",
              defaults: new { controller = "Home", action = "Login", id = UrlParameter.Optional }
          );
            routes.MapRoute(
             name: "update",
             url: "update",
             defaults: new { controller = "Home", action = "Update" }
         );
            routes.MapRoute(
               name: "upload",
               url: "upload/{id}",
               defaults: new { controller = "Home", action = "Uploadfile", id = UrlParameter.Optional }
           );
            routes.MapRoute(
                name: "Default",
                url: "{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
