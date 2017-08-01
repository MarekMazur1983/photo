using Newtonsoft.Json;
using pastephoto.Logic.Message;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pastephoto.Models
{
    public class Pastephoto
    {
        private pastephotoEntities db { get; set; }
        public Pastephoto(pastephotoEntities db)
        {
            this.db = db;
        }
        public pastephoto Fetch(string guid)
        {
            pastephoto pp =this.db.pastephoto.Where(p => p.guid == guid).FirstOrDefault();
            if(pp.lifetime != null)
            {

                var days = (DateTime.Now - (DateTime)pp.added).TotalDays;

                if (days > pp.lifetime)
                    return null;
            }
            return pp;
           
        }

    }
}