﻿using pastephoto.Logic;
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
            if (id == null)
            {
                Businesslogic bl = new Businesslogic();
                ViewBag.guid = bl.GetGuid();
                var x = bl.GetGalleryType();
                
                ViewBag.gallery =bl.GetGalleryType();
                return View();
            }
            else
            {

            } 

            return View("Index");
        }

        public ActionResult Uploadfile(string id)
        {
            bool isSavedSuccessfully = true;
            string fName = "";
            try
            {
                foreach (string fileName in Request.Files)
                {
                    HttpPostedFileBase file = Request.Files[fileName];
                    //Save file content goes here
                    fName = file.FileName;
                    if (file != null && file.ContentLength > 0)
                    {

                        var originalDirectory = new DirectoryInfo(string.Format("{0}Images\\WallImages", Server.MapPath(@"\")));

                        string pathString = System.IO.Path.Combine(originalDirectory.ToString(), "imagepath");

                        var fileName1 = Path.GetFileName(file.FileName);

                        bool isExists = System.IO.Directory.Exists(pathString);

                        if (!isExists)
                            System.IO.Directory.CreateDirectory(pathString);

                        var path = string.Format("{0}\\{1}", pathString, file.FileName);
                        file.SaveAs(path);

                    }

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