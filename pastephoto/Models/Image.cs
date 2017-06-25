using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pastephoto.Models
{
    public class Image
    {
        private pastephotoEntities db { get; set; }
        public Image(pastephotoEntities db)
        {
            this.db = db;
        }
        public void Save(string fileName, string guid)
        {
            image img = new image();
            img.filename = fileName;
            img.guid = guid;
            db.image.Add(img);
            db.SaveChanges();
        }
        public List<image> Fetch(string guid)
        {
            List<image> imgs = db.image.Where(p => p.guid == guid).Select(p => p).ToList();
            return imgs;
        }
    }
}