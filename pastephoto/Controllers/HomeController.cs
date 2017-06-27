using pastephoto.Logic;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace pastephoto.Controllers
{
    //https://stackoverflow.com/questions/12870137/automatically-add-watermark-to-an-image
    public class HomeController : Controller
    {
        public ActionResult Index(string id)
        {
            Businesslogic bl = new Businesslogic();
            if (id == null)
            {
                ViewBag.guid = bl.GetGuid();
                var x = bl.GetGalleryType();
                ViewBag.gallery =bl.GetGalleryType();
                return View();
            }
            else
            {
               
                string viewName = bl.GetGalleryViewName(id);
                ViewBag.guid = id;
                ViewBag.images = bl.GetImages(id);
                ViewBag.settings = bl.GetSettings(id);
                return View("../Home/Gallery/"+ viewName);

            } 

            return View("Index");
        }

        public ActionResult Uploadfile(string id)
        {
            bool isSavedSuccessfully = true;
            string fName = "";
            var bl = new Businesslogic();
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    string mapPath = Server.MapPath(@"\");
                    bl.SaveFileOnDrive(file, mapPath,id);
                    bl.SaveFileInDb(file.FileName, id);

                }

            }
            catch (Exception ex)
            {
                isSavedSuccessfully = false;
            }


            if (isSavedSuccessfully)
            {
                return Json(new { Message = fName }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new { Message = "Error in saving file" });
            }
        }
        public ActionResult Save()
        {
            var settings = Request["json"];
            Businesslogic bl = new Businesslogic();
            var res =bl.SaveSettings(settings);
            return Content(Newtonsoft.Json.JsonConvert.SerializeObject(res));
          
        }
    }
}