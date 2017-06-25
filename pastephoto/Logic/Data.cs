using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace pastephoto.Logic.Message
{
    public class Settings
    {
        public string guid { get; set; }
        public string gallery { get; set; }
        public int? select { get; set; }
        public string password { get; set; }
        public bool isLifetime { get; set; }
        public int? lifetime { get; set; }
        public bool isComments { get; set; }
        public bool isFb { get; set; }
        public bool isPassword { get; set; }
        public bool isRatings { get; set; }
        public bool isWatermark { get; set; }
        public bool isSelect { get; set; }
    }
    public class Response
    {
        public Status status;
        public string error;
    }
    public enum Status
    {
        OK,
        ERROR
    }
    public class Error
    {
        public static string INVALID_DATA = "INVALID_DATA";
    }
}