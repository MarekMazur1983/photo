using System.Web;
using System.Web.Optimization;

namespace pastephoto
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

           bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));
            bundles.Add(new ScriptBundle("~/bundles/application").Include(
                     "~/Scripts/application/application.js",
                     "~/Scripts/application/comm.js",
                     "~/Scripts/application/data.js",
                     "~/Scripts/dropzone/dropzone.js"
                      ));
            bundles.Add(new ScriptBundle("~/bundles/login").Include(
                   "~/Scripts/application/login.js",
                   "~/Scripts/application/comm.js",
                   "~/Scripts/application/data.js"
                  
                    ));
            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/dropzone.css",
                      "~/Content/basic.css"));
      
            bundles.Add(new ScriptBundle("~/bundles/galleria").Include(
                     "~/Scripts/galleries/galleria/galleria-1.5.7.js"
                   
                      ));
            bundles.Add(new ScriptBundle("~/bundles/basiclight").Include(
                     "~/Scripts/application/basiclight.js",
                       "~/Scripts/application/comm.js",
                       "~/Scripts/application/data.js"
                      ));
        }
    }
}
