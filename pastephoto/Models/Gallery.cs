using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pastephoto.Models
{
    public class Gallery
    {
        private pastephotoEntities db { get; set; }
        public Gallery(pastephotoEntities db)
        {
            this.db = db;
        }

        public List<gallery> List()
        {
            return this.db.gallery.Select(p => p).ToList();
        }
    }
}